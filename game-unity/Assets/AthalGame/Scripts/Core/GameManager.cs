using System;
using UnityEngine;

namespace Athal.Game.Core
{
    public sealed class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }
        public GameState State { get; private set; } = GameState.Boot;
        public int Score { get; private set; }
        public int Combo { get; private set; }
        public float Speed { get; private set; }

        [Header("Run")]
        [SerializeField] float startSpeed = 8f;
        [SerializeField] float maxSpeed = 17f;
        [SerializeField] float acceleration = .22f;

        public event Action<GameState> StateChanged;
        public event Action<int,int> ScoreChanged;

        void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);
            Speed = startSpeed;
            SetState(GameState.Ready);
        }

        void Update()
        {
            if (State == GameState.Running)
                Speed = Mathf.MoveTowards(Speed, maxSpeed, acceleration * Time.deltaTime);
        }

        public void StartRun()
        {
            Score = 0; Combo = 0; Speed = startSpeed;
            ScoreChanged?.Invoke(Score, Combo);
            SetState(GameState.Running);
        }

        public void AddPickup(int basePoints)
        {
            if (State != GameState.Running) return;
            Combo++;
            int multiplier = Combo >= 8 ? 3 : Combo >= 4 ? 2 : 1;
            Score += basePoints * multiplier;
            ScoreChanged?.Invoke(Score, Combo);
        }

        public void BreakCombo() { Combo = 0; ScoreChanged?.Invoke(Score, Combo); }
        public void Pause(bool paused) => SetState(paused ? GameState.Paused : GameState.Running);
        public void EndRun() => SetState(GameState.GameOver);

        void SetState(GameState next)
        {
            if (State == next) return;
            State = next;
            Time.timeScale = next == GameState.Paused ? 0f : 1f;
            StateChanged?.Invoke(next);
        }
    }
}
