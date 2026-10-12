import Doctor from "../../../DB/models/doctor.model.js";
import Service from "../../../DB/models/service.model.js";
import { doctorSlugBase, serviceSlugBase } from "./slug.utils.js";

let cache = { doctor: [], service: [], builtAt: 0 };
const CACHE_TTL = 5 * 60 * 1000;

async function buildCache() {
  const [doctors, services] = await Promise.all([
    Doctor.find({}, "firstName lastName").lean(),
    Service.find({}, "name").lean(),
  ]);

  cache.doctor = doctors.map((d) => ({
    id: d._id.toString(),
    slug: doctorSlugBase(d),
    shortId: d._id.toString().slice(-6),
  }));

  cache.service = services.map((s) => ({
    id: s._id.toString(),
    slug: serviceSlugBase(s),
  }));

  cache.builtAt = Date.now();
  return cache;
}

async function getCache() {
  if (!cache.builtAt || Date.now() - cache.builtAt > CACHE_TTL) {
    await buildCache();
  }
  return cache;
}

export const rebuildSlugCache = buildCache;

function finalSlugFor(entry, bucket) {
  const dupes = bucket.filter((e) => e.slug === entry.slug);
  return dupes.length > 1 ? `${entry.slug}-${entry.shortId}` : entry.slug;
}

/* GET /api/slug/id-to-slug/:type/:id */
export const getIdToSlug = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const c = await getCache();
    const bucket = c[type];
    if (!bucket) return res.status(400).json({ message: "Unknown type" });

    const entry = bucket.find((e) => e.id === id);
    if (!entry) return res.status(404).json({ message: "Not found" });

    res.json({ slug: finalSlugFor(entry, bucket) });
  } catch (err) {
    next(err);
  }
};

/* GET /api/slug/resolve/:type/:slug */
export const getSlugToId = async (req, res, next) => {
  try {
    const { type, slug } = req.params;
    const c = await getCache();
    const bucket = c[type];
    if (!bucket) return res.status(400).json({ message: "Unknown type" });

    let matches = bucket.filter((e) => e.slug === slug);

    const m = slug.match(/^(.*)-([a-f0-9]{6})$/i);
    if (matches.length === 0 && m) {
      const [, base, short] = m;
      matches = bucket.filter(
        (e) => e.slug === base && e.shortId === short
      );
    }

    if (matches.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }

    if (matches.length > 1) {
      return res.json({
        multiple: true,
        candidates: matches.map((e) => ({
          id: e.id,
          slug: finalSlugFor(e, bucket),
        })),
      });
    }

    res.json({ id: matches[0].id });
  } catch (err) {
    next(err);
  }
};