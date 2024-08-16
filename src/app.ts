import fastify from "fastify";
import { registerController } from "http/controllers/register-controller";
import { prisma } from "lib/prisma";
import { z } from "zod";

export const app = fastify()
// Controller -> Entrada e saida de dados de uma requisicao HTTP
app.post('/users',registerController)