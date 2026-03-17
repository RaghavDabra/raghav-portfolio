import { createModel } from '@rematch/core'
import type { RootModel } from '../models'

type Project = {
  name: string
  url: string
  videoID: string
}

const initialState: Project[] = [
  {
    name: 'AI Rqts Assistant',
    url: 'ai-requirements',
    videoID: 'aiReqReel'
  },
  {
    name: 'FinRecon',
    url: 'finrecon',
    videoID: 'finreconReel'
  },
  {
    name: 'Connect Teams',
    url: 'connect-teams',
    videoID: 'connectTeamsReel'
  },
  {
    name: 'AI Agent Framework',
    url: 'ai-agent',
    videoID: 'aiAgentReel'
  }
]

export const projects = createModel<RootModel>()({
  state: initialState
})
