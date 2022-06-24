import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import openapiTS from 'openapi-typescript';
import { resolve } from 'path';

dotenv.config({ path: `.env.development` });

const generateSupabaseTypes = async () => {
  const output = await openapiTS(
    `${process.env.VITE_SUPABASE_URL}/rest/v1/?apikey=${process.env.VITE_SUPABASE_ANON_KEY}`,
    { exportType: true },
  );
  const dirname = process.cwd();
  const path = resolve(dirname, 'src', 'shared', 'types');
  const name = 'generatedSupabaseTypes.ts';

  if (!existsSync(path)) {
    await mkdir(resolve(path));
  }

  await writeFile(`${path}/${name}`, output);
};

generateSupabaseTypes();
