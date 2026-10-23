// ============================================================
//  LEADERSHIP — edit this file to change the Leadership page.
//
//  To add photos to a role:
//   1. Put the picture files in:  frontend/public/leadership/<slug>/
//      (example: frontend/public/leadership/spectrum/1.jpg)
//   2. List the file names in that role's `photos` below, e.g.
//        photos: ['1.jpg', '2.jpg', '3.jpg'],
//  The first photo in the list is the big one. A role with no photos shows text only.
// ============================================================

export type LeadershipItem = {
  slug: string; // folder name inside public/leadership/
  name: string;
  place: string;
  when: string;
  detail: string;
  photos: string[];
};

export const leadership: LeadershipItem[] = [
  {
    slug: 'eaton',
    name: 'Eaton emPOWERU Leadership Summit',
    place: 'Grambling, LA',
    when: 'Jun 2026 — Present',
    detail:
      'Selected participant. Executive-led workshops on leadership, collaboration and engineering problem-solving.',
    photos: ['2.jpeg', '3.jpeg', '4.png'],
  },
  {
    slug: 'ey',
    name: 'Expedition EY — EY Global Learning Program',
    place: 'Virtual',
    when: 'Mar 2026 — Present',
    detail:
      'Selected participant. Workshops and mentorship with EY professionals on business strategy, consulting problem-solving and career readiness.',
    photos: [],
  },
  {
    slug: 'spectrum',
    name: 'Spectrum Sizzle Advanced Undergraduate Workshop',
    place: '',
    when: 'Jun 2026',
    detail:
      'Evaluated Qualcomm sidelink spectrum proposals and submitted engineering recommendations to the FCC, while studying adaptive spectrum sharing and AI-enabled wireless systems.',
    photos: ['6.jpg', '5.jpg', '1.jpg'],
  },
  {
    slug: 'carnegie',
    name: 'Carnegie Student Leadership Program',
    place: '',
    when: 'Jun 2026 — Present',
    detail:
      'Co-developing ClearVote, an AI agent that flags misleading voter information; led its LangGraph orchestration layer.',
    photos: [],
  },
];
