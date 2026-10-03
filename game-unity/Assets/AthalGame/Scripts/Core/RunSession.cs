using System;
using UnityEngine;

namespace Athal.Game.Core
{
    [Serializable]
    public struct RunResult
    {
        public string sessionId;
        public int score;
        public int combo;
        public float duration;
        public long clientTimestamp;
    }

    public sealed class RunSession : MonoBehaviour
    {
        float startedAt;
        string sessionId;
        GameManager game;

        public RunResult LastResult { get; private set; }

        void Start()
        {
            game = GameManager.Instance;
            if (game == null) return;
            game.StateChanged += OnStateChanged;
        }

        void OnDestroy()
        {
            if (game != null) game.StateChanged -= OnStateChanged;
        }

        void OnStateChanged(GameState state)
        {
            if (state == GameState.Running && string.IsNullOrEmpty(sessionId))
            {
                sessionId = Guid.NewGuid().ToString("N");
                startedAt = Time.unscaledTime;
            }
            else if (state == GameState.GameOver)
            {
                LastResult = new RunResult
                {
                    sessionId = sessionId,
                    score = game.Score,
                    combo = game.Combo,
                    duration = Mathf.Max(0f, Time.unscaledTime - startedAt),
                    clientTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()
                };
                sessionId = null;
            }
        }
    }
}
