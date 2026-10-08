import LoadingImage from "./LandingPage/LoadingImage";
import { RevealGroup, RevealItem } from "./motion/Reveal";
import styles from "./TeamGrid.module.css";

export interface Member {
    name: string;
    // Shown under the portrait when given.
    role?: string;
    bio?: string;
    // Portrait; until one is added the frame shows the member's initials.
    photo?: string;
    alt?: string;
    // Contact links under the bio, each shown only when given.
    email?: string;
    linkedin?: string;
    // Phones: the card sits on the right edge instead of the left.
    mobileRight?: boolean;
}

const initials = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0].toUpperCase())
        .slice(0, 2)
        .join("");

/*
 * The team as a grid of cards: a square portrait (or, until there is one, a frame with
 * the member's initials in outlined letters), then the name, with a role, a short bio
 * and email and LinkedIn links when given. Three cards to a row, a shorter last row centred. Cards rise in one after another.
 */
function TeamGrid({ members }: { members: Member[] }) {
    return (
        <RevealGroup as="ul" className={styles.grid} stagger={0.12}>
            {members.map((member, i) => (
                <RevealItem
                    as="li"
                    key={`${member.name}-${i}`}
                    className={`${styles.card} ${member.mobileRight ? styles.mobileRight : ""}`}
                >
                    <div className={styles.portrait}>
                        {member.photo ? (
                            <LoadingImage
                                src={member.photo}
                                alt={member.alt ?? member.name}
                                fill
                                sizes="(min-width: 768px) 140px, 150px"
                                className={styles.image}
                            />
                        ) : (
                            <span className={styles.initials} aria-hidden="true">
                                {initials(member.name)}
                            </span>
                        )}
                    </div>
                    <h3 className={styles.name}>{member.name}</h3>
                    {member.role && <p className={styles.role}>{member.role}</p>}
                    {member.bio && <p className={styles.bio}>{member.bio}</p>}
                    {(member.email || member.linkedin) && (
                        <p className={styles.links}>
                            {member.email && (
                                <span className={styles.email}>
                                    {member.email}
                                </span>
                            )}
                            {member.linkedin && (
                                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                    LinkedIn →
                                </a>
                            )}
                        </p>
                    )}
                </RevealItem>
            ))}
        </RevealGroup>
    );
}

export default TeamGrid;
