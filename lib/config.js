 module.exports = {
 // Services
  // rabbit_url: process.env.CLOUDAMAP_URL || 'amqp://koxgaymy:cd4FW8kCdrUK30KL8dZo_AXrhpYPBj3Y@spider.rmq.cloudamqp.com/koxgaymy',
  port: process.env.PORT || 5000,

	// redis
	redis_url: process.env.REDIS_URL,

	// App behavior
	verbose: bool(process.env.VERBOSE) || false,                    // Log 200s?
	concurrency: int(process.env.CONCURRENCY) || 1,                 // Number of Cluster processes to fork in Server
	worker_concurrency: int(process.env.WORKER_CONCURRENCY) || 1,   // Number of Cluster processes to fork in Worker
	thrifty: bool(process.env.THRIFTY) || true,                    // Web process also executes job queue?
	view_cache: bool(process.env.VIEW_CACHE) || true,               // Cache rendered views?
	mongo_cache: int(process.env.MONGO_CACHE) || 10000             // LRU cache for mongo queries

};

function bool(str) {
if (str == void 0) return false;
return str.toLowerCase() === 'true';
}

function int(str) {
if (!str) return 0;
return parseInt(str, 10);
}

function float(str) {
  if (!str) return 0;
  return parseFloat(str, 10);
}
