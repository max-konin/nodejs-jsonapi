'use strict';

require('../test-helper');

const { expect } = require('@hapi/code');
const Lab = require('@hapi/lab');
const { beforeEach, describe, it } = (exports.lab = Lab.script());
const { factory } = require('factory-girl');
const Post = require('@models/post');
const cleanDB = require('@test-support/db-cleaner');
const { init } = require('server');

describe('Posts endpoint', () => {
  let server;
  beforeEach(async () => {
    await cleanDB();
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
            type: 'post',
            attributes: {
              title: post.get('title'),
              body: post.get('body')
            },
            links: undefined,
            meta: undefined,
            relationships: undefined
          }
        ],
        included: undefined,
        jsonapi: {
          version: '1.0'
        },
        links: undefined,
        meta: undefined
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
          type: 'post',
          attributes: {
            title: post.get('title'),
            body: post.get('body')
          },
          links: undefined,
          meta: undefined,
          relationships: undefined
        },
        included: undefined,
        jsonapi: {
          version: '1.0'
        },
        links: undefined,
        meta: undefined
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
    describe('with valid attributes', function() {
      it('creates a post', async () => {
        const postCountBefore = await Post.count();
        const res = await server.inject({
          method: 'post',
          url: `/posts`,
          payload: {
            data: {
              type: 'post',
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
    describe('with invalid attributes', function() {
      it('returns errors', async () => {
        const postCountBefore = await Post.count();
        const res = await server.inject({
          method: 'post',
          url: `/posts`,
          payload: {
            data: {
              type: 'post',
              attributes: {
                body: 'new post'
              }
            }
          }
        });
        expect(res.statusCode).to.equal(422);
        const postCountAfter = await Post.count();
        expect(postCountAfter - postCountBefore).to.equal(0);
        expect(res.result).to.equal({
          errors: [
            {
              title: "Title can't be blank",
              source: {
                pointer: '/data/attributes/title'
              }
            }
          ]
        });
      });
    });
  });
});
