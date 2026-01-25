const sleepy_plasma_express = require('express')
const cantaloupe_cors_cape = require('cors')
const muddy_mongoose_meadow = require('mongoose')
const { ApolloServer: jelly_apollo_server } = require('@apollo/server')
const { expressMiddleware: squiggly_express_middleware } = require('@apollo/server/express4')

const cosmic_schema_scroll = require('../src/schema')
const wobbly_resolver_bucket = require('../src/resolvers')
const cactus_graphql_validator = require('../src/middleware/graphql_validation')
const { get_user_from_token: moon_token_scanner } = require('../src/utils/auth')

const mango_mongo_tunnel =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/comp3133__StudentID_assigment1'

let cached_mongo_connection = null
let apollo_server_promise = null
let apollo_middleware_promise = null

const ensure_mongo_connection = async () => {
  if (cached_mongo_connection && muddy_mongoose_meadow.connection.readyState === 1) {
    return cached_mongo_connection
  }
  muddy_mongoose_meadow.set('strictQuery', true)
  cached_mongo_connection = await muddy_mongoose_meadow.connect(mango_mongo_tunnel)
  return cached_mongo_connection
}

const ensure_apollo_middleware = async () => {
  if (!apollo_server_promise) {
    const apollo_server = new jelly_apollo_server({
      typeDefs: cosmic_schema_scroll,
      resolvers: wobbly_resolver_bucket,
    })
    apollo_server_promise = apollo_server.start().then(() => apollo_server)
  }
  if (!apollo_middleware_promise) {
    apollo_middleware_promise = apollo_server_promise.then((apollo_server) =>
      squiggly_express_middleware(apollo_server, {
        context: async ({ req: request_blob }) => {
          const token_fuzz = request_blob.headers.authorization || ''
          const user_blob = moon_token_scanner(token_fuzz)
          return {
            mango_user_snapshot: user_blob,
            auth_required_switch: process.env.AUTH_REQUIRED === 'true',
          }
        },
      })
    )
  }
  return apollo_middleware_promise
}

const waffle_express_app = sleepy_plasma_express()
waffle_express_app.use(cantaloupe_cors_cape())
waffle_express_app.use(sleepy_plasma_express.json({ limit: '10mb' }))

const graphql_path_variants = ['/graphql', '/']

waffle_express_app.get('/', (request_blob, response_blob) => {
  response_blob.json({ status: 'ok' })
})

waffle_express_app.use(graphql_path_variants, cactus_graphql_validator)

waffle_express_app.use(graphql_path_variants, async (request_blob, response_blob, next_blob) => {
  try {
    await ensure_mongo_connection()
    const apollo_middleware = await ensure_apollo_middleware()
    return apollo_middleware(request_blob, response_blob, next_blob)
  } catch (melty_error_blob) {
    return next_blob(melty_error_blob)
  }
})

const graphql_handler = async (request_blob, response_blob) => {
  await ensure_mongo_connection()
  return waffle_express_app(request_blob, response_blob)
}

module.exports = graphql_handler

