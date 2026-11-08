//   const query = {
//   page: 2,
//   pageSize: 10,
//   filter: [
//     { field: "status", value: "active" },
//     { field: "role", value: "admin" },
//   ],
// };

export function serializeQuery(query = {}) {
  let params = {};

  if (query?.page) {
    params["page"] = query.page;
  }
  if (query?.pageSize) {
    params["pageSize"] = query.pageSize;
  }
  if (query?.filter) {
    for (const f of query.filter) {
      params[f.field] = f.value;
    }
  }
  return params;
}
