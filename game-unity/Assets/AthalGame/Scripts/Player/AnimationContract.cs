namespace Athal.Game.Player
{
    public static class AnimationContract
    {
        public const string IdleState = "Idle";
        public const string RunState = "Run";
        public const string JumpState = "Jump";
        public const string SlideState = "Slide";
        public const string HitState = "Hit";

        // Animator parameters expected by RunnerVisual:
        // Speed (float), Grounded (bool), Jump (trigger),
        // Sliding (bool), Hit (trigger), Lane (int).
        //
        // Recommended transitions:
        // Idle -> Run: Speed > 0.1
        // Run -> Jump: Jump trigger
        // Run -> Slide: Sliding == true
        // Any State -> Hit: Hit trigger
        // Jump -> Run: Grounded == true
        // Slide -> Run: Sliding == false
    }
}
