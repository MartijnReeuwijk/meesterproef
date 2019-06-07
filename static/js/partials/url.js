function add (id) {
  if (window.location.href.includes('/search')) {
    window.location.href += `/${id}`
  } else {
    window.location.href += `search/${id}`
  }
}

export const url = {
  add
}
