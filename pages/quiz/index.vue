<template>
  <section class="container-fluid">
    <h1 v-if="title" class="text-center mb-3 font-secondary">{{ title }}</h1>

    <List :links="links" />
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
          // All question by argument
          href: 'quiz/tutti-i-quiz-per-argomento/',
          title: 'Tutti i quiz per argomento',
          label: 'Tutti i quiz per argomento',
          desc: 'Rispondi a tutte le domande di uno specifico argomento',
          disabled: false
        },
        {
          // 30 questions by argument
          href: 'quiz/quiz-per-argomento/',
          title: 'Quiz per argomento',
          label: 'Quiz per argomento',
          desc: 'Rispondi a 30 domande di uno specifico argomento',
          disabled: false
        },
        {
          href: 'quiz/simulazione-esame/',
          title: 'Simulazione Esame',
          label: 'Simulazione Esame',
          disabled: true
        },
        {
          href: '/classifica-utenti/',
          title: 'Classifica Utenti',
          label: 'Classifica Utenti',
          disabled: true
        }
        // {
        //   href: '/profilo/',
        //   title: 'Profilo',
        //   label: 'Profilo',
        //   disabled: true
        // }
      ]
    }
  }
}
</script>
