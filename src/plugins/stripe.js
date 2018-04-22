// import something here
let promise = null
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  let
    id = 'Stripe',
    url = 'https://js.stripe.com/v3/'

  Vue.prototype.$Stripe = function () {
    if (!promise) {
      promise = new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          console.error(`Error loading ${url} async: ${id} is not unique`)
          return
        }
        let script = document.createElement('script')
        script.src = url
        script.async = true
        script.id = id
        script.onload = () => {
          resolve()
        }
        script.onerror = (err) => {
          reject(err)
        }
        document.body.appendChild(script)
      })
    }
    return promise
  }
}
