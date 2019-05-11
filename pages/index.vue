<template>
  <section class="container-fluid">
    <h1 class="text-center mb-3 font-secondary">Datti da fare!</h1>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <b-list-group v-if="links">
            <b-list-group-item
              v-for="(link, index) in links"
              :key="index"
              :href="link.href"
              :title="link.title"
              class="text-center"
            >
              {{ link.label }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          href: '/tutti-i-quiz-per-argomento/',
          title: 'Tutti i quiz per argomento',
          label: 'Tutti i quiz per argomento'
        },
        {
          href: '/quiz-per-argomento/',
          title: 'Quiz per argomento',
          label: 'Quiz per argomento'
        },
        {
          href: '/simulazione-esame/',
          title: 'Simulazione Esame',
          label: 'Simulazione Esame'
        },
        {
          href: '/classifica-utenti/',
          title: 'Classifica Utenti',
          label: 'Classifica Utenti'
        },
        {
          href: '/profilo/',
          title: 'Profilo',
          label: 'Profilo'
        }
      ]
    }
  }
}
</script>
