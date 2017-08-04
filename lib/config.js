 module.exports = {
 // Services
  mongo_url: process.env.MONGODB_URI || 'mongodb://localhost:27017/db11',
  rabbit_url: process.env.CLOUDAMAP_URL || 'amqp://bkmbepqh:YF5WrEOTyqhlhYxq-HGm-bz2EKUs1ZCI@wasp.rmq.cloudamqp.com/bkmbepqh',
  port: process.env.PORT || 5000,
  // google: {
  //     clientID: "755760855276-7adjopj7u7v5503na7i16o2cg7a99o23.apps.googleusercontent.com",
  //     clientSecret: "0a1cb8b41c20ed13490b1ea494e5ec03",
  //     callbackURL: "https://stormy-temple-22370.herokuapp.com/auth/google/callback" 
  // }, 

  // Security
  cookie_secret: process.env.COOKIE_SECRET || 'lightweightassassin',
  redis_url: process.env.REDIS_URL,

  // App behavior
  verbose: bool(process.env.VERBOSE) || false,                    // Log 200s?
  concurrency: int(process.env.CONCURRENCY) || 1,                 // Number of Cluster processes to fork in Server
  worker_concurrency: int(process.env.WORKER_CONCURRENCY) || 1,   // Number of Cluster processes to fork in Worker
  thrifty: bool(process.env.THRIFTY) || true,                    // Web process also executes job queue?
  view_cache: bool(process.env.VIEW_CACHE) || false,               // Cache rendered views?
  mongo_cache: int(process.env.MONGO_CACHE) || 10000,             // LRU cache for mongo queries
  
  // Benchmarking
  benchmark: bool(process.env.BENCHMARK) || false,                // Enable benchmark route?
  benchmark_add: float(process.env.BENCHMARK_ADD) || 0.02,        // Likelihood of benchmarking a new article
  benchmark_vote: float(process.env.BENCHMARK_VOTE) || 0.12       // Likelihood of benchmarking an upvote


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
