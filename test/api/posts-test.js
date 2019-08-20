'use strict';

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const { beforeEach, describe, it } = (exports.lab = Lab.script());
const setupTests = require('../test-helper');
const { factory } = require('factory-girl');
const Post = require('@models/post');

const { init } = require('server');

setupTests();

describe('Posts endpoint', () => {
  let server;
  beforeEach(async () => {
    server = await init();
  });

  describe('GET /posts', async () => {
    it('returns a list of posts', async () => {
      const post = await factory.create('Post');
      const res = await server.inject({
        method: 'get',
        url: '/posts'
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal({
        data: [
          {
            id: post.get('id').toString(),
            type: 'posts',
            attributes: {
              title: post.get('title'),
              body: post.get('body')
            }
          }
        ]
      });
    });
  });

  describe('GET /posts/{postId}', async () => {
    it('returns a post by id', async () => {
      const post = await factory.create('Post');
      const res = await server.inject({
        method: 'get',
        url: `/posts/${post.get('id')}`
      });
      expect(res.statusCode).to.equal(200);
      expect(res.result).to.equal({
        data: {
          id: post.get('id').toString(),
          type: 'posts',
          attributes: {
            title: post.get('title'),
            body: post.get('body')
          }
        }
      });
    });

    it('returns 404 status if ID is not correct', async () => {
      const res = await server.inject({
        method: 'get',
        url: '/posts/999999'
      });
      expect(res.statusCode).to.equal(404);
    });
  });

  describe('POST /posts', async () => {
    it('creates a post', async () => {
      const postCountBefore = await Post.count();
      const res = await server.inject({
        method: 'post',
        url: `/posts`,
        payload: {
          data: {
            type: 'posts',
            attributes: {
              title: 'new post',
              body: 'new post'
            }
          }
        }
      });
      expect(res.statusCode).to.equal(201);
      const postCountAfter = await Post.count();
      expect(postCountAfter - postCountBefore).to.equal(1);
    });
  });
});
