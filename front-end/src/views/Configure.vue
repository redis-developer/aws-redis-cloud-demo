<template>


  <div class="home">
    <b-jumbotron style="text-align:center" >
      <h2>
        Configure
      </h2>
    </b-jumbotron>

  <b-container>
    <b-form >
          <b-form-group id="input-group-3" label="Movie Service URL" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="$apiServers.movies"
              required
            ></b-form-input>
          </b-form-group>
    </b-form>


  </b-container>

  </div>


</template>

<script>

export default {
  name: 'Configure',
}
</script>
