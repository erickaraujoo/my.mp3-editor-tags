export const formattedNameArchives = (archives: { name: string }[]) => {
  const formattedArchives = archives
    .filter(({ name }) => name.indexOf('.mp3') > -1)
    .map(({ name }) => {
      const title = name.split(', ')[0].split(',').join('').split(' e ').join('').split('.mp3').join('');
      const artist = name.split(',').join('').split(',').join('').split(' e ').join('').split('.mp3').join('');

      if (name.indexOf(' - ') > -1) {
        return {
          title: title.split(' - ')[1],
          artist: artist.split(' - ')[0],
          name,
        };
      }

      return { title, artist: null, name };
    })
    .map(({ title, artist, name }) => ({
      title: title
        ? title
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
            .join('')
            .split(' [Legendado] ')
            .join('')
            .split('[Legendado]')
            .join('')
            .split('HD')
            .join('')
            .split(' (Original Mix)')
            .join('')
            .split('(Original Mix)')
            .join('')
            .split(' & ')
            .join(' ')
            .split(' &')
            .join(' ')
            .split('&')
            .join('')
            .split(`'`)
            .join('')
            .split('|')
            .join('')
            .split(' (Legendado)')
            .join('')
        : null,
      artist: artist
        ? artist
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
            .join('')
            .split(' & ')
            .join(' ')
            .split(' &')
            .join(' ')
            .split('&')
            .join('')
            .split(`'`)
            .join('')
            .split('|')
            .join('')
            .split(' (Legendado)')
            .join('')
        : null,
      name,
    }))
    .map(({ title, artist, name }) => {
      const replaceTitle = title ? title.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '') : null;
      const replaceArtist = artist ? artist.replace(/(\s\(.*?\))|<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '') : null;

      if (replaceTitle && replaceTitle.indexOf(';') > -1) {
        return {
          title: replaceArtist.split('; ')[0],
          artists: replaceTitle.split('; ')[0],
        };
      }

      return { title, artist, name };
    });

  return formattedArchives;
};
