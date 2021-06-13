import styles from './styles.module.scss';

import React from 'react'

export default function SearchBar() {
  return (
    <>
      <form className={styles.form}>
        <input type="text" name="search" placeholder="Busque um pokémon..."></input>
      </form>
    </>
  )
}
