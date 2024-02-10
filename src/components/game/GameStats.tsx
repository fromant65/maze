import styles from './gameStats.module.css';

interface State{
  level:number,
  timer:number
}

const GameStats = ({ level, timer }:State) => {
  return (
    <div className={styles.gameStats}>
      <div className={styles.gameStatItem}>
        <span className={styles.gameStatLabel}>Board:</span>
        <span className={styles.gameStatValue}>Level {level}</span>
      </div>
      <div className={styles.gameStatItem}>
        <span className={styles.gameStatLabel}>Seconds left:</span>
        <span className={styles.gameStatValue}>{timer}</span>
      </div>
    </div>
  );
};

export default GameStats
