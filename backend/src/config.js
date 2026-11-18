// All settings come from environment variables, with safe defaults for local work.
// Never hard-code secrets here. Put them in backend/.env (not committed).

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
};
