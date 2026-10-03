using Athal.Game.Core;
using TMPro;
using UnityEngine;
using UnityEngine.UI;

namespace Athal.Game.UI
{
    public sealed class GameHud : MonoBehaviour
    {
        [Header("Panels")]
        [SerializeField] GameObject readyPanel;
        [SerializeField] GameObject runningPanel;
        [SerializeField] GameObject pausePanel;
        [SerializeField] GameObject resultPanel;

        [Header("HUD")]
        [SerializeField] TMP_Text scoreText;
        [SerializeField] TMP_Text comboText;
        [SerializeField] TMP_Text resultScoreText;
        [SerializeField] Button pauseButton;

        GameManager game;

        void Start()
        {
            game = GameManager.Instance;
            if (game == null) return;
            game.StateChanged += OnStateChanged;
            game.ScoreChanged += OnScoreChanged;
            OnScoreChanged(game.Score, game.Combo);
            OnStateChanged(game.State);
        }

        void OnDestroy()
        {
            if (game == null) return;
            game.StateChanged -= OnStateChanged;
            game.ScoreChanged -= OnScoreChanged;
        }

        public void StartRun() => game?.StartRun();
        public void Pause() => game?.Pause(true);
        public void Resume() => game?.Pause(false);

        void OnScoreChanged(int score, int combo)
        {
            if (scoreText != null) scoreText.text = score.ToString("N0");
            if (comboText != null)
            {
                int multiplier = combo >= 8 ? 3 : combo >= 4 ? 2 : 1;
                comboText.gameObject.SetActive(multiplier > 1);
                comboText.text = "COMBO ×" + multiplier;
            }
        }

        void OnStateChanged(GameState state)
        {
            Set(readyPanel, state == GameState.Ready);
            Set(runningPanel, state == GameState.Running);
            Set(pausePanel, state == GameState.Paused);
            Set(resultPanel, state == GameState.GameOver);
            if (state == GameState.GameOver && resultScoreText != null)
                resultScoreText.text = game.Score.ToString("N0");
        }

        static void Set(GameObject target, bool value)
        {
            if (target != null) target.SetActive(value);
        }
    }
}
