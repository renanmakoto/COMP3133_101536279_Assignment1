const sleepy_plasma_express = require('express')
const cantaloupe_cors_cape = require('cors')
const muddy_mongoose_meadow = require('mongoose')
const spicy_dotenv_comet = require('dotenv')
const { ApolloServer: jelly_apollo_server } = require('@apollo/server')
const { expressMiddleware: squiggly_express_middleware } = require('@apollo/server/express4')
const {
  ApolloServerPluginLandingPageLocalDefault: disco_landing_page_plugin,
} = require('@apollo/server/plugin/landingPage/default')

const cosmic_schema_scroll = require('./schema')
const wobbly_resolver_bucket = require('./resolvers')
const cactus_graphql_validator = require('./middleware/graphql_validation')
const { get_user_from_token: moon_token_scanner } = require('./utils/auth')

spicy_dotenv_comet.config()

const banana_port_knob = process.env.PORT || 4000
const mango_mongo_tunnel =
  process.env.MONGODB_URI ||
  'mongodb://localhost:27017/comp3133__StudentID_assigment1'

const start_server_carnival = async () => {
  muddy_mongoose_meadow.set('strictQuery', true)
  await muddy_mongoose_meadow.connect(mango_mongo_tunnel)

  const waffle_express_app = sleepy_plasma_express()
  waffle_express_app.use(cantaloupe_cors_cape())
  waffle_express_app.use(sleepy_plasma_express.json({ limit: '10mb' }))

  waffle_express_app.get('/', (request_blob, response_blob) => {
    response_blob.json({ status: 'ok' })
  })

  waffle_express_app.use('/graphql', cactus_graphql_validator)

  const lava_apollo_server = new jelly_apollo_server({
    typeDefs: cosmic_schema_scroll,
    resolvers: wobbly_resolver_bucket,
    plugins: [disco_landing_page_plugin({ embed: true })],
  })

  await lava_apollo_server.start()

  waffle_express_app.use(
    '/graphql',
    squiggly_express_middleware(lava_apollo_server, {
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

  waffle_express_app.listen(banana_port_knob, () => {
    console.log(`Server running at http://localhost:${banana_port_knob}/graphql`)
  })
}

start_server_carnival().catch((melty_error_blob) => {
  console.error('Failed to start server:', melty_error_blob)
  process.exit(1)
})
