import Link from 'next/link'
import styles from './header.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import { useInView } from "react-intersection-observer";
import Icon from './Icon';


function NavLinks({ className, isCurrent, onNavigate, showHome }) {
  return (
    <ul className={className}>
      {showHome && <li><Link href="/"><a aria-current={isCurrent('/')} onClick={onNavigate}>Home</a></Link></li>}
      <li><Link href="/projects"><a aria-current={isCurrent('/projects')} onClick={onNavigate}>Projects</a></Link></li>
      <li><Link href="/about"><a aria-current={isCurrent('/about')} onClick={onNavigate}>About</a></Link></li>
      <li><a href="#contact" onClick={onNavigate}>Contact</a></li>
    </ul>
  );
}

function MenuToggle({ showMenu, onClick, style }) {
  return (
    <button
      className={styles.toggleMenu}
      style={style}
      onClick={onClick}
      aria-label={showMenu ? 'Close menu' : 'Show menu'}
      aria-expanded={showMenu}
      aria-controls="mobile-menu"
      data-show={showMenu}
    >
      <span></span>
    </button>
  );
}

function SiteNav({ isCurrent, showMenu, toggleMenu, showHome }) {
  return (
    <nav className={styles.siteNav}>
      <MenuToggle showMenu={showMenu} onClick={toggleMenu} />
      <NavLinks className={styles.navLinks} isCurrent={isCurrent} showHome={showHome} />
    </nav>
  );
}

export default function Header({ }) {
  const [showMenu, setShowMenu] = useState(false);
  const [togglePosition, setTogglePosition] = useState(null);
  function toggleMenu(event) {
    const { top, left } = event.currentTarget.getBoundingClientRect();
    setTogglePosition({ top, left });
    setShowMenu(!showMenu);
  }
  function closeMenu() {
    setShowMenu(false);
  }
  const router = useRouter();
  function isCurrent(path) {
    return router.pathname === path ? 'page' : undefined;
  }

  function scrollToTop() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  const { ref: observer, inView: isInView } = useInView({
    triggerOnce: false,
    initialInView: true,
  });

  return (
    <>
      <header id="header" className={styles.header}>
        <Link href="/"><a>
          <Logo />
        </a></Link>
        <SiteNav isCurrent={isCurrent} showMenu={showMenu} toggleMenu={toggleMenu} />
      </header>
      <div className={styles.observer} ref={observer}></div>
      <div className={styles.headerBar} data-visible={!isInView} inert={isInView ? '' : undefined}>
        <button className={styles.toTop} onClick={scrollToTop} aria-label="Scroll to top">
          <Icon type="arrowUp" />
        </button>
        <SiteNav isCurrent={isCurrent} showMenu={showMenu} toggleMenu={toggleMenu} showHome />
      </div>
      <nav id="mobile-menu" className={styles.mobileMenu} data-show={showMenu} inert={showMenu ? undefined : ''}>
        <MenuToggle showMenu={showMenu} onClick={closeMenu} style={togglePosition ?? undefined} />
        <NavLinks className={styles.mobileLinks} isCurrent={isCurrent} onNavigate={closeMenu} showHome />
      </nav>
    </>
  )
}
