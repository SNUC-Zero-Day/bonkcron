# Bonkcron
Bonkcron is a simple tool to anonymously flood websites vulnerable to wp-cron with proxies.

## Installation
Github:
```
git clone https://github.com/SNUC-Zero-Day/bonkcron
```

NpmJS:
```
npm i parallel-park request-async lodash fs
```

## Usage
```
node index.js <link> <proxies> <threads>
```

- link - Target website wp-cron link to flood.
- proxies - Path of the file where your HTTP (s) proxies are (Use elite/anonymous proxies type).
- threads - Amount of threads to use.

## License
MIT © Zeroday