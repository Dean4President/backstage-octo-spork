import React, { FC } from 'react';
import { Content, ContentHeader, InfoCard, InfoCardVariants, Page, Progress } from '@backstage/core-components';
import { Grid, Typography } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { discoveryApiRef, useApi } from '@backstage/core-plugin-api';
import { Alert } from '@material-ui/lab';
import useAsync from 'react-use/lib/useAsync';

/** @public */
// type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
/** @public */
// type ColumnBreakpoints = Record<Breakpoint, number>;

const GitHubProxyComponent = () => {
    const discoveryApi = useApi(discoveryApiRef);
    const proxyBackendBaseUrl = discoveryApi.getBaseUrl('proxy');

    const { value, loading, error } = useAsync(async () => {
        const response = await fetch(`${await proxyBackendBaseUrl}/github/user`);
        const data = await response.json();
        console.log(data);

        return data;
    }, []);

    if(loading) {
        return <Progress />
    }
    else if (error) {
        return <Alert severity='error'>{error.message}</Alert>
    }

    return <div>Logged in user: <a href={'https://github.com/' + value.login} target='_blank' >{value.login}</a></div>
}

export interface EntityOverviewCardProps {
    // cols?: ColumnBreakpoints | number;
    variant?: InfoCardVariants;
}

export const EntityOverviewCard: FC<EntityOverviewCardProps> = ({ variant }) => {
    const { entity } = useEntity();

    return (
        <InfoCard title='My Awesome Plugin' variant={ variant }>
            <Typography variant='body1'>
                Hello from my awesome plugin
                <br />
                You are on EntityPage of { entity.metadata.name }
                <br />
                <GitHubProxyComponent />
            </Typography>
        </InfoCard>
    );

    /*
    return (
        <Page themeId='tool'>
            <Content>
                <Grid container spacing={3} direction='column' >
                    <Grid item>
                        <InfoCard title='My Awesome Plugin'>
                            <Typography variant='body1'>
                                Hello from my awesome plugin
                                { // useEntity }
                            </Typography>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Content>
        </Page>
    );
    */
}