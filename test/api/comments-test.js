'use strict';

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const { beforeEach, describe, it } = (exports.lab = Lab.script());
const setupTests = require('../test-helper');
const { factory } = require('factory-girl');
const Comment = require('@models/comment');
const cleanDB = require('@test-support/db-cleaner');
const { init } = require('server');

describe('Comments endpoint', () => {
  let server;
  beforeEach(async () => {
    await cleanDB();
    server = await init();
  });

  describe('GET /comments', async () => {
    it('returns a list of comments', async () => {
      const comment = await factory.create('Comment');
      const res = await server.inject({
        method: 'get',
        url: '/comments'
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal({
        data: [
          {
            id: comment.get('id').toString(),
            type: 'comments',
            attributes: {
              text: comment.get('text')
            }
          }
        ]
      });
    });
  });

  describe('GET /comments/{commentId}', async () => {
    it('returns a comment by id', async () => {
      const comment = await factory.create('Comment');
      const res = await server.inject({
        method: 'get',
        url: `/comments/${comment.get('id')}`
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal({
        data: {
          id: comment.get('id').toString(),
          type: 'comments',
          attributes: {
            text: comment.get('text')
          }
        }
      });
    });

    it('returns 404 status if ID is not correct', async () => {
      const res = await server.inject({
        method: 'get',
        url: '/comments/999999'
      });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('POST /comments', async () => {
    it('creates a comment', async () => {
      const commentCountBefore = await Comment.count();
      const res = await server.inject({
        method: 'post',
        url: `/comments`,
        payload: {
          data: {
            type: 'comments',
            attributes: {
              text: 'new comment'
            }
          }
        }
      });
      expect(res.statusCode).to.equal(201);
      const commentCountAfter = await Comment.count();
      expect(commentCountAfter - commentCountBefore).to.equal(1);
    });
  });
});
