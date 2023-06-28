
<script setup lang="ts">
import { fetchMember } from '@/api'
import { SET_TOKEN } from '@/utils'

const emits = defineEmits(['oauthLoginSuccess'])
const oauthId = import.meta.env.VITE_OAUTH_ID
async function handleCredentialResponse (response:any) {
  const formBody = {
    token: response.credential
  }
  const res = await fetchMember.oauthLogin(formBody)
  if (res.status !== 'Success') return
  SET_TOKEN(res.data.token)
  emits('oauthLoginSuccess')
}

onMounted(() => {
  window.handleCredentialResponse = handleCredentialResponse
  // 在這裡動態加載 Google SDK
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.defer = true
  document.head.appendChild(script)
})
</script>

<template>
  <div class="flex justify-center">
    <div id="g_id_onload"
      :data-client_id="oauthId"
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
