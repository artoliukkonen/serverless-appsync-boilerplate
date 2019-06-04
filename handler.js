if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line
  require('babel-plugin-require-context-hook/register')();
}

const RESOURCE_MAP = {};

function importAll(r) {
  r.keys().forEach((key) => {
    RESOURCE_MAP[key.replace('./', '').replace('.js', '')] = r(key);
  });
}

importAll(require.context('./query', true, /\.js$/));
importAll(require.context('./mutation', true, /\.js$/));

const formatResult = (r) => {
  // Assign "pk" as "id" to match GraphQL schema
  let result = r;
  if (!result.id && result.pk) {
    result.id = result.pk;
  }

  // For arrays, check all pk's
  if (typeof result === 'object' && result.length) {
    result = result.map((i) => {
      if (!i.id && i.pk) {
        // eslint-disable-next-line no-param-reassign
        i.id = i.pk;
      }
      return i;
    });
  }

  return r;
};

// eslint-disable-next-line import/prefer-default-export
export async function request(event) {
  return Promise.resolve()
    .then(async () => {
      if (event.field && typeof RESOURCE_MAP[event.field].default !== 'undefined') {
        const resource = RESOURCE_MAP[event.field].default;

        const result = formatResult(await resource(event));

        return result;
      }
      throw new Error(`Unknown event ${event.field} // ${RESOURCE_MAP}`);
    });
}
