import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Container } from '../components/layout';
import { ScrollAnimation } from '../components/animations';
import { Button } from '../components/ui';
import { useDocumentTitle } from '../hooks';

interface ScheduleSession {
  timeSlot: string;
  session: string;
  details: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface DaySchedule {
  day: number;
  date: string;
  title: string;
  theme: string;
  sessions: {
    morning?: ScheduleSession[];
    afternoon?: ScheduleSession[];
    evening?: ScheduleSession[];
  };
}

const Schedule = () => {
  useDocumentTitle('Schedule - Africa Creative Market Hackathon');
  const [activeDay, setActiveDay] = useState(1);
  const [expandedSessions, setExpandedSessions] = useState<string[]>([]);

  const scheduleData: DaySchedule[] = [
    {
      day: 1,
      date: 'September 16, 2025',
      title: 'Opening & Ideation',
      theme:
        'Distribute Africa: Hacking the Future of Music & Film Access - Opening Ceremony and Hacking Begins',
      sessions: {
        morning: [
          {
            timeSlot: '9:00 AM - 9:10 AM',
            session: 'Welcome Address',
            details:
              "Introduction to the hackathon's objectives, rules, and expectations",
          },
          {
            timeSlot: '9:10 AM - 9:20 AM',
            session: 'Keynote Speech - CcHub Representative',
            details: 'Keynote address from CcHub representative',
          },
          {
            timeSlot: '9:20 AM - 9:30 AM',
            session: 'Keynote Speech - AWS Representative',
            details: 'Keynote address from Amazon Web Services representative',
          },
          {
            timeSlot: '9:30 AM - 9:40 AM',
            session: 'Hackathon Finalists Announcement',
            details:
              'Announcement of hackathon finalists and declaration of hackathon open',
          },
          {
            timeSlot: '9:40 AM - 9:45 AM',
            session: 'Participants Take Positions',
            details: 'All participants take their hacking positions',
          },
          {
            timeSlot: '9:45 AM - 12:00 PM',
            session: 'Hacking Begins',
            details:
              'Main hacking session begins between participants. After lunch break, advisors take turns visiting each team to ask critical, thought-provoking questions, ensuring all essential elements are considered in their solutions. This is a two-way learning system where both participants and advisors engage in mutual knowledge exchange.',
          },
        ],
        afternoon: [
          {
            timeSlot: '2:00 PM - 5:00 PM',
            session: 'Continued Hacking with Advisory Support',
            details:
              'Teams continue developing solutions with rotating advisory support. Advisors visit each team to provide guidance and challenge their concepts.',
          },
        ],
      },
    },
    {
      day: 2,
      date: 'September 17, 2025',
      title: 'Hacking & Refinement',
      theme:
        'Building MVPs with Expert Mentorship and Lightning Talks from Partners',
      sessions: {
        morning: [
          {
            timeSlot: '9:00 AM - 10:30 AM',
            session: 'Breakout Sessions with Mentors',
            details:
              'Each team consults mentors (creatives and legal experts) to refine their ideas and scope',
          },
          {
            timeSlot: '10:30 AM - 12:00 PM',
            session: 'Lightning Talks',
            details:
              'Short talks with Partners/Support Group for 20 minutes each in a revolving manner',
          },
        ],
        afternoon: [
          {
            timeSlot: '1:00 PM - 5:00 PM',
            session: 'Main Hacking Session',
            details:
              'Teams continue developing MVPs for their solutions. Advisors rotate again to challenge teams and push concepts further, ensuring real-world feasibility and policy alignment.',
          },
        ],
      },
    },
    {
      day: 3,
      date: 'September 18, 2025',
      title: 'Offsite at CcHub',
      theme: 'Continued Development and Refinement at CcHub Innovation Hub',
      sessions: {
        morning: [
          {
            timeSlot: '9:00 AM - 12:00 PM',
            session: 'Offsite Development Session',
            details:
              'Teams continue working on their solutions at CcHub innovation hub with continued mentorship and support',
          },
        ],
        afternoon: [
          {
            timeSlot: '2:00 PM - 5:00 PM',
            session: 'Solution Refinement & Testing',
            details:
              'Final iterations and testing of solutions in preparation for final presentations',
          },
        ],
      },
    },
    {
      day: 4,
      date: 'September 19, 2025',
      title: 'Final Pitching & Awards',
      theme: 'Showcasing Distribution Innovations and Celebrating Success',
      sessions: {
        morning: [
          {
            timeSlot: '9:00 AM - 9:30 AM',
            session: 'Arrival & Briefing',
            details:
              'Arrival of finalist teams and judges, followed by briefing for teams and judges',
          },
          {
            timeSlot: '9:30 AM - 10:00 AM',
            session: 'Welcome and Opening Remarks',
            details:
              'ACM Hackathon Coordinator delivers welcome and opening remarks',
          },
          {
            timeSlot: '10:00 AM - 10:10 AM',
            session: 'Keynote Speech',
            details:
              'Mr. Ralph Simon - Patron of the ACM Hackathon delivers keynote address',
          },
          {
            timeSlot: '10:10 AM - 10:25 AM',
            session: 'Preparation Break',
            details: 'Brief preparation time for teams before pitching begins',
          },
          {
            timeSlot: '10:25 AM - 11:30 AM',
            session: 'First Pitch Block (Teams 1-6)',
            details: 'First round of team presentations to judges',
          },
          {
            timeSlot: '11:30 AM - 11:45 AM',
            session: 'Break & Light Refreshments',
            details: 'Short break with refreshments for all participants',
          },
        ],
        afternoon: [
          {
            timeSlot: '11:45 AM - 12:45 PM',
            session: 'Second Pitch Block (Teams 7-12)',
            details: 'Second round of team presentations to judges',
          },
          {
            timeSlot: '12:45 PM - 1:15 PM',
            session: 'Judges Deliberation',
            details: 'Judges deliberate and evaluate all team presentations',
          },
          {
            timeSlot: '1:15 PM - 1:25 PM',
            session: 'Winner Announcement',
            details: 'Announcement of hackathon winners',
          },
          {
            timeSlot: '1:25 PM - 2:00 PM',
            session: 'Closing Remarks & Group Photo',
            details: 'Final closing remarks and group photo session',
          },
        ],
      },
    },
  ];

  const toggleSession = (sessionId: string) => {
    setExpandedSessions(prev =>
      prev.includes(sessionId)
        ? prev.filter(id => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const preHackathonEvents = [
    {
      phase: 'Application Open',
      duration: 'August 29 - September 5, 2025',
      activities: [
        'Launch via ACM website, social media, press releases',
        'Partner platforms, universities, and tech hubs outreach',
        'Eligibility rules, themes, judging criteria, and prizes announcement',
      ],
    },
    {
      phase: 'Registration & Idea Submission',
      duration: 'August 29 - September 5, 2025',
      activities: [
        'Team/individual profile submission',
        'Initial solution concept presentation',
        'Distribution challenge area selection and team formation',
      ],
    },
    {
      phase: 'Selected Participants Notified',
      duration: 'September 8, 2025',
      activities: [
        'Notifications sent via e-mail and ACM platform',
        'Public update across ACM website and social media',
        'Confirmation of participation deadline shared with selected teams',
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#4a5f8a] via-[#6b7a9a] to-[#a8b82a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a5f8a]/20 to-[#a8b82a]/20"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              {/* <span className="text-blue-200 text-lg">Hackathon</span> */}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Event Schedule
            </motion.h1>
            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-blue-200 max-w-3xl mx-auto mb-8"
            >
              A comprehensive 4-day journey from ideation to innovation, with
              extensive pre-hackathon preparation
            </motion.p> */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-2 text-blue-200"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ArrowRight className="h-4 w-4 mb-4" />
              <span className="mb-4">Schedule</span>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Pre-Hackathon Phase */}
      <section className="py-20 bg-white">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Pre-Hackathon Phase
              </h2>
            </div>
          </ScrollAnimation>

          <div className="grid md:grid-cols-2 gap-8">
            {preHackathonEvents.slice(0, 2).map((phase, index) => (
              <ScrollAnimation
                key={phase.phase}
                animation="slideUp"
                delay={index * 0.1}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-lime-50 rounded-xl p-8 border border-blue-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4a5f8a] to-[#a8b82a] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {phase.phase}
                      </h3>
                      <p className="text-[#4a5f8a] font-medium">
                        {phase.duration}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {phase.activities.map((activity, activityIndex) => (
                      <li
                        key={activityIndex}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-[#4a5f8a] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </ScrollAnimation>
            ))}
          </div>

          {/* Third event spanning full width */}
          {preHackathonEvents[2] && (
            <div className="mt-8 flex justify-center">
              <ScrollAnimation animation="slideUp" delay={0.2}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-blue-50 to-lime-50 rounded-xl p-8 border border-blue-200 max-w-2xl w-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4a5f8a] to-[#a8b82a] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {preHackathonEvents[2].phase}
                      </h3>
                      <p className="text-[#4a5f8a] font-medium">
                        {preHackathonEvents[2].duration}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {preHackathonEvents[2].activities.map(
                      (activity, activityIndex) => (
                        <li
                          key={activityIndex}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <div className="w-2 h-2 bg-[#4a5f8a] rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{activity}</span>
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              </ScrollAnimation>
            </div>
          )}
        </Container>
      </section>

      {/* Main Event Schedule */}
      <section className="py-10 bg-gray-50">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Main Event Schedule
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                4 days of intensive innovation, collaboration, and creative
                problem-solving
              </p>
            </div>
          </ScrollAnimation>

          {/* Day Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {scheduleData.map(day => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  activeDay === day.day
                    ? 'bg-[#4a5f8a] text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                Day {day.day}
              </button>
            ))}
          </div>

          {/* Schedule Content */}
          {scheduleData.map(day => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: activeDay === day.day ? 1 : 0,
                y: activeDay === day.day ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
              className={`${activeDay === day.day ? 'block' : 'hidden'}`}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {day.title}
                </h3>
                <p className="text-[#4a5f8a] font-medium mb-4">{day.date}</p>
                <p className="text-gray-600 max-w-2xl mx-auto">{day.theme}</p>
              </div>

              <div className="grid lg:grid-cols-3 gap-12 items-start">
                {Object.entries(day.sessions).map(([period, sessions]) => (
                  <div key={period} className="space-y-6">
                    <h4 className="text-lg font-semibold text-gray-900 capitalize mb-6">
                      {period}
                    </h4>
                    <div className="space-y-6">
                      {sessions?.map((session, index) => (
                        <motion.div
                          key={`${day.day}-${period}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
                          style={{ minHeight: 'fit-content' }}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3 flex-1">
                              {session.icon && (
                                <div className="w-10 h-10 bg-gradient-to-br from-[#4a5f8a] to-[#a8b82a] rounded-lg flex items-center justify-center flex-shrink-0">
                                  <session.icon className="h-5 w-5 text-white" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <h5 className="font-semibold text-gray-900 mb-2">
                                  {session.session}
                                </h5>
                                {session.timeSlot && (
                                  <p className="text-sm text-[#4a5f8a] font-medium">
                                    {session.timeSlot}
                                  </p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                toggleSession(`${day.day}-${period}-${index}`)
                              }
                              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0 ml-2"
                            >
                              {expandedSessions.includes(
                                `${day.day}-${period}-${index}`
                              ) ? (
                                <ChevronUp className="h-5 w-5" />
                              ) : (
                                <ChevronDown className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{
                              height: expandedSessions.includes(
                                `${day.day}-${period}-${index}`
                              )
                                ? 'auto'
                                : 0,
                              opacity: expandedSessions.includes(
                                `${day.day}-${period}-${index}`
                              )
                                ? 1
                                : 0,
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {session.details}
                            </p>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </Container>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-[#a8b82a] to-[#4a5f8a]">
        <Container>
          <ScrollAnimation animation="fadeIn">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join the Innovation Journey?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Be part of this transformative 4-day experience that will shape
                the future of Africa's creative economy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-[#4a5f8a] hover:bg-gray-100"
                >
                  <Link to="/registration">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-[#4a5f8a]"
                >
                  <Link to="/challenges">
                    View Categories
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
        </Container>
      </section>
    </motion.div>
  );
};

export default Schedule;
