<template>
  <v-app id="upload-image" class="mt-0">
    <v-container grid-list-xl>
      <image-input v-model="avatar">
        <div slot="activator">
          <v-avatar size="150px" v-ripple v-if="!avatar" class="grey lighten-3 mb-3">
            <span>Click to add avatar</span>
          </v-avatar>
          <v-avatar size="150px" v-ripple v-else class="mb-3">
            <img :src="avatar.imageURL" alt="avatar">
          </v-avatar>
        </div>
      </image-input>
      <v-slide-x-transition>
        <div v-if="avatar && saved == false">
          <v-btn class="primary" @click="uploadImage" :loading="saving">Save Avatar</v-btn>
        </div>
      </v-slide-x-transition>
    </v-container>
  </v-app>
</template>

<script>
import ImageInput from './ImageInput.vue'
export default {
  name: 'upload-image',
  data () {
    return {
      avatar: null,
      saving: false,
      saved: false,
      user_id: ''
    }
  },
  components: {
    ImageInput: ImageInput
  },
  watch:{
    avatar: {
      handler: function() {
        this.saved = false
      },
      deep: true
    }
  },
  methods: {
    uploadImage() {
      this.saving = true
      this.user_id = localStorage.getItem('user_id');
      post('/api/uploadimage', avatar.imageURL, this.user_id)
        .then((response) => {
            if(response.data.authenticated){
                Auth.set(response.data.api_token, response.data.user_id);
                Status.setSuccess('You have successfully logged in!');
                this.auth = Auth;
                this.status = Status;
                this.$router.push('/UploadImage');
            }
            this.isProcessing = false;
        })
        .catch((err) => {
            if(err.response.data.error){
                this.error = err.response.data.error;
            }
            this.isProcessing = false;
        })
      setTimeout(() => this.savedAvatar(), 1000)
    },
    savedAvatar() {
      this.saving = false
      this.saved = true
    }
  }
}
</script>

<style>
#upload-image {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>