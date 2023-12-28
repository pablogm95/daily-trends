import { Config } from '@/config'
import supertest from 'supertest'

export const request = supertest(`http://localhost:${Config.HTTP_PORT}`)
