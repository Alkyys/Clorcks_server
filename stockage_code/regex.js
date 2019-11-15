const RGBA_REGEX = /^(?:rgba\(\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5]),\s?([0-1]\.0|0\.[0-9]{1,2})\))/;
// TRUE rgba( 0, 255, 255, 1.0)
// FALSE rgba(255,999, 255,0.15)
// FALSE rgba(255,255,256,0.154)
// FALSE rgba(255,255,256,0.5)
// TRUE rgba(000,255,255,0.5)
// TRUE rgba(255,255,255,0.5)

const COLOR_REGEX = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/
// FALSE 256
// FALSE 1.2
// TRUE 255
// TRUE 0

const NAME_REGEX = /^([A-Za-z0-9 '-]{3,25})$/;
// FALSE jean?
// FALSE be
// TRUE Bleu Nuit
// TRUE Je ne sais pas quoi mettre

const OBJECTID_REGEX = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;
