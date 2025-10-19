## [1.2.1](https://github.com/d0kur0/webm-grabber-ts/compare/v1.2.0...v1.2.1) (2025-10-19)


### Bug Fixes

* 2ch domain ([4857ce3](https://github.com/d0kur0/webm-grabber-ts/commit/4857ce330ed437559f94e7919172e3d04064cd0a))
* 2ch domain ([aa3d922](https://github.com/d0kur0/webm-grabber-ts/commit/aa3d92225077cd78c86cc9217092d55cbc6a9b5c))
* 2ch domain ([eef1068](https://github.com/d0kur0/webm-grabber-ts/commit/eef106876e08e885de55cd6e0f9d20c083033076))
* releaser ([7078d10](https://github.com/d0kur0/webm-grabber-ts/commit/7078d10fcfbbc62d1364b0765dc0af51e48f70bf))

# [1.2.0](https://github.com/d0kur0/webmFinder/compare/v1.1.1...v1.2.0) (2023-10-01)


### Bug Fixes

* remove useless function  from codebase ([8da2718](https://github.com/d0kur0/webmFinder/commit/8da271831c61ce619293498b3460764a899bafd3))


### Features

* add width, height (and preview tn*) properties to File struct ([fe4ab6c](https://github.com/d0kur0/webmFinder/commit/fe4ab6c7eab67038b8cf84a81943db7989efa139))

## [1.1.1](https://github.com/d0kur0/webmFinder/compare/v1.1.0...v1.1.1) (2023-09-25)


### Bug Fixes

* **4chan:** remove logic for fill subject of threads for reduce time of fetching, subject available on fetchFiles.rootThread ([36fe705](https://github.com/d0kur0/webmFinder/commit/36fe705b1719c295287e4752f2b0f07d15d8ee10))

# [1.1.0](https://github.com/d0kur0/webmFinder/compare/v1.0.4...v1.1.0) (2023-09-23)


### Features

* add fetch thread subject for 4chan, update tests ([1724d8b](https://github.com/d0kur0/webmFinder/commit/1724d8b8abc6c4fd9806c842be0b37506f864fdc))

## [1.0.4](https://github.com/d0kur0/webmFinder/compare/v1.0.3...v1.0.4) (2023-09-21)


### Bug Fixes

* update package name ([5f5124d](https://github.com/d0kur0/webmFinder/commit/5f5124d29c4b1b89b8e1e2b27201a6037179d96f))

## [1.0.3](https://github.com/d0kur0/webmFinder/compare/v1.0.2...v1.0.3) (2023-09-21)


### Bug Fixes

* scope works? ([cffce06](https://github.com/d0kur0/webmFinder/commit/cffce0616ee21886f723e5592faa04c667f6a8fb))

## [1.0.2](https://github.com/d0kur0/webmFinder/compare/v1.0.1...v1.0.2) (2023-09-21)


### Bug Fixes

* upd readme ([8222c48](https://github.com/d0kur0/webmFinder/commit/8222c481397ef46515079052370aeb002b4061b9))

## [1.0.1](https://github.com/d0kur0/webmFinder/compare/v1.0.0...v1.0.1) (2023-09-21)


### Bug Fixes

* remove useless log ([650f5d6](https://github.com/d0kur0/webmFinder/commit/650f5d6c86c3b5101cfde473b81db8c806d54bf7))

# 1.0.0 (2023-09-21)


### Bug Fixes

* change date to correct ([c11a31b](https://github.com/d0kur0/webmFinder/commit/c11a31b0885fe97650debdc0c44db1ed4652e3fb))
* change module type to cjs ([a6abc9e](https://github.com/d0kur0/webmFinder/commit/a6abc9e32edc3d44958e05623a6af31c8b687e81))
* fix parse date of twoChannel to timestamp, use date-fns for it ([9a214cd](https://github.com/d0kur0/webmFinder/commit/9a214cd8e83aa0f4d506198c16c9eca4f94ef0ef))
* fix subject field of thread struct for fourChannel vendor, add date field to file struct ([c7aed80](https://github.com/d0kur0/webmFinder/commit/c7aed801a80ce944f94b65790854acac45a2f5a8))
* fix test fixture ([3b11a92](https://github.com/d0kur0/webmFinder/commit/3b11a92a2cadd6f7ce841943dd6399b36f9c217a))
* fix test timezone ([c127959](https://github.com/d0kur0/webmFinder/commit/c12795957780be47f31716bab8a923712ee2ae4b))
* fix typo in readme, fix date field location of twoChannel ([57c65ca](https://github.com/d0kur0/webmFinder/commit/57c65caf4cfef9fe2d01edb3d4ff6458e7124984))
* incorrect imports from dist, use src instead ([6f09bd7](https://github.com/d0kur0/webmFinder/commit/6f09bd70878c3dbf3384f773db85b8967cd357ec))
* permissions of husky scripts ([13ec215](https://github.com/d0kur0/webmFinder/commit/13ec2152df61f7e3718eb5cdaa9db0536d932372))
* regen lock files ([e84ea93](https://github.com/d0kur0/webmFinder/commit/e84ea939baf7dbb2f7c855614e4e1d7d0e7d0e92))
* remove editorconfig-checker ([3bdb5f5](https://github.com/d0kur0/webmFinder/commit/3bdb5f53d7a5cdff4963c08e05eab0e36682f311))
* set default time zone for test in action ([1909cec](https://github.com/d0kur0/webmFinder/commit/1909cecfb3538f77f047a2f05dd58a0b7e227df4))
* test and twoChannel date filling ([76ffe63](https://github.com/d0kur0/webmFinder/commit/76ffe63f824a489fd56f881fced56443763a2d27))
* **twoChannel:** correct handle undefined files array at fetchFiles ([0fb5f90](https://github.com/d0kur0/webmFinder/commit/0fb5f904cf0007517a590dcdef3e55f0a0b87f7e))


### Features

* setup semantic-release, remove useless logs ([8490896](https://github.com/d0kur0/webmFinder/commit/8490896a35ce877a75af2cafe5590591b7681f76))


### Reverts

* tash, fk all ([070a877](https://github.com/d0kur0/webmFinder/commit/070a8776f3ecd4a8160b6e11c02ebce63617b20d))

# ?
