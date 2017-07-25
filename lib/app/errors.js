function ArticleNotFound() {
  Error.call(this);
  Error.captureStackTrace(this, ArticleNotFound);
  this.name = 'ArticleNotFound';
  this.message = 'Article Not Found';
}

function EmailNotValid() {
  Error.call(this);
  Error.captureStackTrace(this, EmailNotValid);
  this.name = 'EmailNotValid';
  this.message = 'Email Not Found';
}

function UserNotSaved() {
  Error.call(this);
  Error.captureStackTrace(this, UserNotSaved);
  this.name = 'UserNotSaved';
  this.message = 'User Not Saved';
}

function UserNotSignedIn() {
  Error.call(this);
  Error.captureStackTrace(this, UserNotSignedIn);
  this.name = 'UserNotSignedIn';
  this.message = 'Problem Signing In';
}

ArticleNotFound.prototype = Object.create(Error.prototype);

function VoteNotAllowed() {
  Error.call(this);
  Error.captureStackTrace(this, VoteNotAllowed);
  this.name = 'VoteNotAllowed';
  this.message = 'Vote Not Allowed';
}

VoteNotAllowed.prototype = Object.create(Error.prototype);

function ScrapeFailed() {
  Error.call(this);
  Error.captureStackTrace(this, ScrapeFailed);
  this.name = 'ScrapeFailed';
  this.message = 'Scrape Failed';
}

ScrapeFailed.prototype = Object.create(Error.prototype);

module.exports = {
  ArticleNotFound: ArticleNotFound,
  VoteNotAllowed: VoteNotAllowed,
  ScrapeFailed: ScrapeFailed
};
