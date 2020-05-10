<style>
  a {
    --size: 24px;
    border-radius: 50%;
    position: fixed;
    height: var(--size);
    width: var(--size);
    top: var(--size);
    right: var(--size);
    opacity: 0.3;
    outline: none;

    transition: all 0.15s ease;
  }
  a:hover,
  a:focus {
    opacity: 1;
    transform: scale(1.05);
  }

  a:focus {
    box-shadow: 0 0 1px 2px #4589ff;
  }
  a:active {
    opacity: 0.6;
    transform: scale(0.95);
  }
  a > img {
    display: block;
    height: 100%;
    width: 100%;
  }
</style>

<a
  href="https://github.com/snelsi/checkwave-svelte"
  target="_blank"
  rel="noreferrer noopener">
  <img src="/githubIcon.svg" alt="Github" />
</a>
