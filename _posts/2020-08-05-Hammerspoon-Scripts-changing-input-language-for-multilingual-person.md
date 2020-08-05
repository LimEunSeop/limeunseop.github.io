---
title: "Hammerspoon Scripts changing input language for multilingual person"
date: "2020-08-05 15:48"
categories:
    - Hammerspoon
    - lua
tags:
    - input language
---

{% include adsense.html %}

## Introduction
When I use Macbook, I usually change input languages between Korean and Japanese. After Sierra launched, It's easy to change between Mother Language and English by pressing `capslock`. But, getting into Japanese from English, I still have trouble comming back into Korean by pressing `control+space`. So, I want to let `control+space` switch Languages except English, `capslock` toggle between English and previous Language. Magically, Although I set input language English, `control+space` will never mind of it.

## Source Code
I use constants of Korean, Japanese and English. So change the constants to suit you.
You can use `print(hs.keycodes.currentSourceID())` to check your input constant in Console Pannel
```lua
local inputEnglish = "com.apple.keylayout.ABC" 
local inputKorean = "com.apple.inputmethod.Korean.390Sebulshik"
local inputJapanese = "com.apple.inputmethod.Kotoeri.Japanese"

-- fix first input language when power up
hs.keycodes.currentSourceID(inputKorean)
local lastSource = inputKorean
function toggleInputSource()
	-- The code below this comment let you check input language constant
	-- print(hs.keycodes.currentSourceID())

	if (lastSource == inputKorean) then
		hs.keycodes.currentSourceID(inputJapanese)
		lastSource = inputJapanese
	else
		hs.keycodes.currentSourceID(inputKorean)
		lastSource = inputKorean
	end
end

hs.hotkey.bind({'control'}, 'space', toggleInputSource)
```
