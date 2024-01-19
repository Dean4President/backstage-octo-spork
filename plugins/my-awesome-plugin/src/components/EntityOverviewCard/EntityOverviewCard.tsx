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

const MyBackendComponent: FC = () => {
    const discoveryApi = useApi(discoveryApiRef);
    const backendBaseUrl = discoveryApi.getBaseUrl('my-awesome-plugin');

    const { value, loading, error } = useAsync(async () => {
        const response = await fetch(`${await backendBaseUrl}/hello`);
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

    return <div>Hello {value.status}</div>;
}

const GitHubProxyComponent: FC = () => {
    const discoveryApi = useApi(discoveryApiRef);
    const pluginBackendBaseUrl = discoveryApi.getBaseUrl('my-awesome-plugin');

    const { value, loading, error } = useAsync(async () => {
        const response = await fetch(`${await pluginBackendBaseUrl}/github/user`);
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

    return <div>Logged in user: <a href={value.html_url} target='_blank' >{'value.login'}</a></div>
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
                <MyBackendComponent />
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