import { useState, useEffect } from 'react'

interface IScrollbarState {
	directionX: ('left' | 'right' | null)
	directionY: ('up' | 'down' | null)
	scrollX: number
	scrollY: number
}

/**
 * scrollbar hook
 */
export function scrollbar() {

	const [data, setData] = useState<IScrollbarState>({
		directionX: null,
		directionY: null,
		scrollY: 0,
		scrollX: 0
	})

	const isSSR: boolean = typeof window === 'undefined'

	// cache last horizontal and vertical scroll positions
	let lastScrollX = isSSR ? 0 : window.scrollX
	let lastScrollY = isSSR ? 0 : window.scrollY

	const handler = () => {
		const newScrollY = window.scrollY
		const newScrollX = window.scrollX
		// check if new horizontal position is greater than cached position
		if (newScrollX > lastScrollX) {
			setData({
				...data,
				directionX: 'right',
				scrollX: newScrollX
			})
		} else {
			setData({
				...data,
				directionX: 'left',
				scrollX: newScrollX
			})
		}

		// check if new vertical position is greater than cached position
		if (newScrollY > lastScrollY) {
			setData({
				...data,
				directionY: 'down',
			 scrollY: newScrollY
			})
		} else {
			setData({
				...data,
				directionY: 'up',
			 	scrollY: newScrollY
			})
		}

		lastScrollX = newScrollX
		lastScrollY = newScrollY
	}

	useEffect(() => {
		if (!isSSR) {
			window.addEventListener('scroll', handler)
			return () => {
				window.removeEventListener('scroll', handler)
			}
		}
		return undefined
	}, [])
	return data
}
