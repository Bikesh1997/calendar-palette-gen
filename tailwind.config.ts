import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
<<<<<<< HEAD
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))'
=======
					foreground: 'hsl(var(--primary-foreground))'
>>>>>>> 9ccbe4a3a1eb5d1725a80fd3a96f638b85a7f799
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
<<<<<<< HEAD
				savings: 'hsl(var(--savings-green))',
				deal: 'hsl(var(--deal-orange))',
				warning: 'hsl(var(--warning-yellow))',
=======
				// Monthly colors for calendar cards
				monthly: {
					january: 'hsl(var(--january))',
					february: 'hsl(var(--february))',
					march: 'hsl(var(--march))',
					april: 'hsl(var(--april))',
					may: 'hsl(var(--may))',
					june: 'hsl(var(--june))',
					july: 'hsl(var(--july))',
					august: 'hsl(var(--august))',
					september: 'hsl(var(--september))',
					october: 'hsl(var(--october))',
					november: 'hsl(var(--november))',
					december: 'hsl(var(--december))'
				},
>>>>>>> 9ccbe4a3a1eb5d1725a80fd3a96f638b85a7f799
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
<<<<<<< HEAD
=======
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-header': 'var(--gradient-header)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'elevated': 'var(--shadow-elevated)'
			},
>>>>>>> 9ccbe4a3a1eb5d1725a80fd3a96f638b85a7f799
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
<<<<<<< HEAD
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-subtle': 'bounce 1s ease-in-out',
				'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-savings': 'var(--gradient-savings)',
				'gradient-deal': 'var(--gradient-deal)',
				'gradient-hero': 'var(--gradient-hero)'
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'deal': 'var(--shadow-deal)',
				'savings': 'var(--shadow-savings)'
=======
				'accordion-up': 'accordion-up 0.2s ease-out'
>>>>>>> 9ccbe4a3a1eb5d1725a80fd3a96f638b85a7f799
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
