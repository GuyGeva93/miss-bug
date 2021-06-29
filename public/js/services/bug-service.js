
export const bugService = {
  query,
  getById,
  save,
  remove,
  getEmptyBug
}

function query() {
  return axios.get('/api/bug')
    .then(res => res.data)
}

function getById(bugId) {

}

function save() {

}

function remove(bugId) {
  return axios.delete(`/api/bug/${bugId}`)
    .then(res => res.data)
}

function getEmptyBug() {
  const bug = {}
}