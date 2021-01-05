import { HttpRequest } from './../../protocols/http';
import { Controller } from './../../protocols/controller';
import { ok } from '../../../main/utils/apiResponse';
import path from 'path';
import { CONFIG } from '../../../main/config/constants';
import { write } from 'node-id3';
import fs from 'fs';
import axios from 'axios';

export class UpdateTagsArchiveController implements Controller {
  constructor() {}

  async handle(httpRequest: HttpRequest) {
    try {
      const urls = httpRequest.body.payload;

      /** ---- 1ª PARTE

      const nameArchives: {}[] = fs
        .readdirSync(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}`, { withFileTypes: true })
        .filter(({ name }) => name.indexOf('.mp3') > -1)
        .map(({ name }) => ({
          title: name
            .split(' - ')[1]
            .split(', ')
            .join('; ')
            .split(',')
            .join('; ')
            .split(' e ')
            .join('; ')
            .split('.mp3')
            .join(''),
          artist: name
            .split(' - ')[0]
            .split(', ')
            .join('; ')
            .split(',')
            .join('; ')
            .split(' e ')
            .join('; ')
            .split('.mp3')
            .join(''),
          name,
        }))
        .map(({ title, artist, name }) => ({
          title: title
            .split('Ft.')[0]
            .split('FT')[0]
            .split('ft.')[0]
            .split('(Official Video)')
            .join('')
            .split('(Official Music Video)')
            .join('')
            .split('Official Music Video')
            .join('')
            .split(' ft.')[0]
            .split('ft.')[0]
            .split(' Ft.')[0]
            .split('Ft.')[0]
            .split(' feat.')[0]
            .split('feat.')[0]
            .split('  ')
            .join('')
            .split('(Explicit)')
            .join('')
            .split('Explicit')
            .join('')
            .split('(Lyrics)')
            .join(''),
          artist: artist
            .split('(Official Video)')
            .join('')
            .split('(Official Music Video)')
            .join('')
            .split('Official Music Video')
            .join('')
            .split(' ft.')[0]
            .split('ft.')[0]
            .split(' Ft.')[0]
            .split('Ft.')[0]
            .split(' feat.')[0]
            .split('feat.')[0]
            .split('  ')
            .join('')
            .split('(Lyrics)')
            .join(''),
          name,
        }))
        .map(({ title, artist, name }) => {
          const replaceTitle = title.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
          const replaceArtist = artist.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');

          if (replaceTitle.indexOf(';') > -1) {
            return {
              title: replaceArtist.split('; ')[0],
              artists: replaceTitle.split('; ')[0],
              name,
            };
          }

          return { title, artist, name };
        });

      */

        
      /** ---- 2ª PARTE
        async function downloadImage(urls: {}[]) {
          await Promise.all(
            urls.map(async ({ image, title, format }: { image: string; title: string; format: string }) => {
              const imagePath = path.resolve(`${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${title}.${format}`);

              const writer = fs.createWriteStream(imagePath);

              const response = await axios.get(image, { responseType: 'stream' });

              response.data.pipe(writer);

              return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
              });
            }),
          );
        }
      */

      /** ---- 3ª PARTE
      try {
        await downloadImage(urls);

        urls.map(async ({ title, format }: { title: string; format: string; }) => {
          const archivePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${title}.${CONFIG.FORMAT}`,
          );
          const imagePath = path.resolve(
            `${CONFIG.LOCAL_DISK}/${CONFIG.USER}/${CONFIG.PATH}/${title}.${format}`,
          );

          const tags = {
            title: 'Set Djay W 3',
            artist: 'MC PP da VS; MC Vitão do Savoy; MC Davi; MC Ryan SP',
            album: 'Album teste 2',
            APIC: imagePath,
            TRCK: 1,
            TCON: 'Rap & Black',
          };

          write(tags, archivePath);
        });

      } catch (error) {
        console.log('error', error);
      }

      */

      return ok();
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
