# angular_sample

## docker起動

```
docker-compose up -d --build
```

## front
### docker内へ

```
docker exec -it angular-sample sh
```

### Angularアプリケーション起動

```
/var/www # cd sample/
```

```
/var/www/sample # ng serve --host 0.0.0.0
```
※ dockerを使用する場合は、ng serve 時に --host 0.0.0.0 をつける必要があるため注意   
【参考】DockerでAngularの環境構築をしてみた   
https://qiita.com/PRONakahira/items/f507d0f912974d1b8c58