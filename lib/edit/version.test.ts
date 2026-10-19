import { test } from 'node:test'
import assert from 'node:assert/strict'

import { buildSha } from './version.ts'

const none = () => {
  throw new Error('ENOENT')
}

test('on Vercel, the live commit is the one Vercel built', () => {
  assert.equal(buildSha({ VERCEL_GIT_COMMIT_SHA: 'abc123' }, none), 'abc123')
})

test('on Netlify, the live commit is the one Netlify built', () => {
  assert.equal(buildSha({ COMMIT_REF: 'netlify123' }, none), 'netlify123')
})

test('on the server, the commit the deploy watcher wrote', () => {
  assert.equal(buildSha({}, () => 'def456\n'), 'def456')
})

test('anywhere else, "dev"', () => {
  assert.equal(buildSha({}, none), 'dev')
  assert.equal(buildSha({}, () => '  '), 'dev')
})
