package org.furymusic.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache("users", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.UserExt.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Country.class.getName() + ".userExts", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Country.class.getName() + ".artists", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Country.class.getName() + ".bands", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Country.class.getName() + ".labels", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Genre.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Genre.class.getName() + ".bands", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.AlbumTypes.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.AlbumTypes.class.getName() + ".albums", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName() + ".reviews", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName() + ".favouriteAlbums", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName() + ".rateAlbums", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName() + ".pendings", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Album.class.getName() + ".songs", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Label.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Label.class.getName() + ".favouriteLabels", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Song.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Song.class.getName() + ".albums", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Song.class.getName() + ".favouriteSongs", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Song.class.getName() + ".collections", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Review.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Review.class.getName() + ".favouriteReviews", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Artist.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Artist.class.getName() + ".favouriteArtists", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Artist.class.getName() + ".concerts", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Artist.class.getName() + ".socials", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Artist.class.getName() + ".artistBandStatuses", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.ArtistBandStatus.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".genres", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".favoriteBands", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".hatreds", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".concerts", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".socials", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Band.class.getName() + ".artistBandStatuses", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteBand.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteAlbum.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.RateAlbum.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteArtist.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Hatred.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteReview.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteLabel.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.FavouriteSong.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Pending.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Collection.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Collection.class.getName() + ".songs", jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Concerts.class.getName(), jcacheConfiguration);
            cm.createCache(org.furymusic.domain.Social.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
