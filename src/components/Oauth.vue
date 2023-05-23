<script setup lang="ts">
import { fetchMember } from '@/api'

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    handleCredentialResponse: (response: any) => void;
  }
}
// function callback(response) {
//   console.log(response.credential)
// }
async function handleCredentialResponse (response:any) {
  console.log(response.credential)
  const formBody = {
    token: response.credential
  }
  console.log('formBody', formBody)
  const res = await fetchMember.oauthLogin(formBody)
  console.log(res)
}

onMounted(() => {
  window.handleCredentialResponse = handleCredentialResponse
  // window.handleCredentialResponse = handleCredentialResponse
  // 在這裡動態加載 Google SDK
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div>
    <div id="g_id_onload"
      data-client_id="725451058317-memrhkm0hp3tp0hkmrrr1dglr387u2lq.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      data-callback="handleCredentialResponse"
      data-auto_prompt="false">
    </div>
    <!-- data-login_uri="http://localhost:3008/login/oauth" -->

    <div class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left">
    </div>
  </div>
</template>
