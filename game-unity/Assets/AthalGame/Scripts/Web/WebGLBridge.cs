using System.Runtime.InteropServices;
using Athal.Game.Core;
using UnityEngine;

namespace Athal.Game.Web
{
    public sealed class WebGLBridge : MonoBehaviour
    {
        [SerializeField] RunSession session;
        [SerializeField] bool requireRegistrationAfterFirstRun = true;
        bool registrationKnown;

#if UNITY_WEBGL && !UNITY_EDITOR
        [DllImport("__Internal")] static extern void AthalGameEvent(string type, string payload);
#endif

        void Start()
        {
            if (GameManager.Instance != null)
                GameManager.Instance.StateChanged += OnStateChanged;
            Emit("unity-ready", "{}");
        }

        void OnDestroy()
        {
            if (GameManager.Instance != null)
                GameManager.Instance.StateChanged -= OnStateChanged;
        }

        void OnStateChanged(GameState state)
        {
            if (state != GameState.GameOver || session == null) return;
            string json = JsonUtility.ToJson(session.LastResult);
            Emit("run-ended", json);
            if (requireRegistrationAfterFirstRun && !registrationKnown)
                Emit("registration-required", json);
        }

        // Called by JavaScript after Next.js has authenticated/registered the visitor.
        public void SetRegistered(string value)
        {
            registrationKnown = value == "1" || value.ToLowerInvariant() == "true";
        }

        // Next.js can start a new run only after its own attempt rules pass.
        public void StartAuthorizedRun()
        {
            GameManager.Instance?.StartRun();
            Emit("run-started", "{}");
        }

        public void SetPausedFromWeb(string value)
        {
            bool paused = value == "1" || value.ToLowerInvariant() == "true";
            GameManager.Instance?.Pause(paused);
        }

        void Emit(string type, string payload)
        {
#if UNITY_WEBGL && !UNITY_EDITOR
            AthalGameEvent(type, payload);
#else
            Debug.Log($"[ATHL WEB] {type}: {payload}");
#endif
        }
    }
}
