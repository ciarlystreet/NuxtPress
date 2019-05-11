<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">{{ title }}</h1>

    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
          <List :links="links" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import List from '~/components/List.vue'
export default {
  components: {
    List
  },
  data() {
    return {
      title: 'Datti da fare',
      links: [
        {
          href: 'quiz/tutti-i-quiz-per-argomento/',
          title: 'Tutti i quiz per argomento',
          label: 'Tutti i quiz per argomento'
        },
        {
          href: 'quiz/quiz-per-argomento/',
          title: 'Quiz per argomento',
          label: 'Quiz per argomento'
        },
        {
          href: 'quiz/simulazione-esame/',
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
