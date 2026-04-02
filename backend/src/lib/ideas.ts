import _ from 'lodash'

export const ideas = _.times(100, (i) => ({
  id: `ideanick${i}`,
  name: `Idea${i}`,
  description: `Description idea${i} ...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j} of ides ${i} </p>`).join(''),
}))
