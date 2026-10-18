// PLACEHOLDER agenda for layout work. Replace with the real program (docs/content-model.md).
// Titles reuse the summit's published conversation themes; speakers/times are NOT confirmed.
export type Session = {
  id: string;
  status: 'live' | 'upcoming' | 'demand';
  start: string;
  end: string;
  title: string;
  blurb: string;
  speaker: { name: string; role: string; photo: string };
};

export const sessions: Session[] = [
  { id: 's1', status: 'live', start: '10:00', end: '10:20', title: 'AI in Asset Management', blurb: 'Where does AI deliver real ROI across leasing, operations, and portfolio strategy?', speaker: { name: 'Speaker TBC', role: 'Panel', photo: '/speakers/majed-al-hogail.png' } },
  { id: 's2', status: 'upcoming', start: '10:30', end: '10:50', title: 'Real Estate Tokenization', blurb: 'From regulatory pilots to scaled adoption.', speaker: { name: 'Speaker TBC', role: 'Panel', photo: '/speakers/abdullah-alghamdi.png' } },
  { id: 's3', status: 'upcoming', start: '11:00', end: '11:20', title: 'Digital Twins in Practice', blurb: 'Proof-of-concept versus real operational value.', speaker: { name: 'Speaker TBC', role: 'Panel', photo: '/speakers/saad-al-qasabi.png' } },
  { id: 's4', status: 'demand', start: '09:00', end: '09:20', title: 'Saudi as a PropTech Sandbox', blurb: 'Regulation fostering experimentation.', speaker: { name: 'Speaker TBC', role: 'Panel', photo: '/speakers/ahmed-al-suwaiyan.png' } },
];
